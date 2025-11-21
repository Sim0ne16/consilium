package eu.consilium.core.util.mapper;


import eu.consilium.core.model.dto.transaction.WalletDTO;
import eu.consilium.core.model.entity.transaction.WalletEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class WalletMapper {

    private final UserMapper userMapper;

    public WalletDTO toDTO(WalletEntity walletEntity) {
        return WalletDTO.builder()
                .user(userMapper.toDTO(walletEntity.getUser()))
                .balance(walletEntity.getBalance())
                .build();
    }

    public WalletEntity toEntity(WalletDTO walletDTO) {
        return WalletEntity.builder()
                .user(userMapper.toEntity(walletDTO.getUser()))
                .balance(walletDTO.getBalance())
                .build();
    }
}